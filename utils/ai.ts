import { OpenAI } from 'langchain/llms/openai'
import { StructuredOutputParser } from 'langchain/output_parsers'
import { PromptTemplate } from 'langchain/prompts'
import { z } from 'zod'

const answerSchema = z.object({
  color: z
    .string()
    .describe(
      'a hexadecimal color code that represents the mood of the entry. ' +
        '(i.e. #0101FE for blue representing happiness).',
    ),
  isNegative: z.boolean().describe('is the journal entry negative? (i.e. does it contain negative emotions?).'),
  mood: z.string().describe('the mood of the person who wrote the journal entry.'),
  subject: z.string().describe('the subject of the journal entry.').max(150),
  summary: z.string().describe('quick summary of the entire entry.'),
  sentimentScore: z
    .number()
    .describe(
      'sentiment of the text and rated on a scale from -10 to 10, ' +
        'where -10 is extremely negative, 0 is neutral, ' +
        'and 10 is extremely positive.',
    ),
})

type Answer = z.infer<typeof answerSchema>

const parser = StructuredOutputParser.fromZodSchema(answerSchema)

const getPrompt = async (content: string) => {
  const format_instructions = parser.getFormatInstructions()

  const promptTemplate = new PromptTemplate({
    template:
      'Analyze the following journal entry.' +
      'Follow the instructions and format your response to match the format instructions and format, ' +
      'no matter what! \n{format_instructions}\n{entry}',
    inputVariables: ['entry'],
    partialVariables: { format_instructions },
  })

  const input = await promptTemplate.format({
    entry: content,
  })

  return input
}

export const analyze = async (content: string): Promise<Answer> => {
  const input = await getPrompt(content)
  const model = new OpenAI({
    temperature: 0,
    modelName: 'gpt-3.5-turbo',
  })

  const result = await model.call(input)

  try {
    return parser.parse(result)
  } catch (error) {
    if (error instanceof Error) {
      console.error(`[ERROR] [analyze] ${error.message}`)
      Promise.reject(error)
    }

    console.error(`[ERROR] [analyze] Something went wrong`)
    console.error(error)

    return Promise.reject(new Error('Something went wrong'))
  }
}
