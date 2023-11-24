import { OpenAI } from 'langchain/llms/openai'
import { StructuredOutputParser } from 'langchain/output_parsers'
import { z } from 'zod'

const answerSchema = z.object({
  color: z
    .string()
    .describe(
      'a hexadecimal color code that represents the mood of the entry. ' +
        '(i.e. #0101FE for blue representing happiness).',
    ),
  mood: z.string().describe('the mood of the person who wrote the journal entry.'),
  negative: z.boolean().describe('is the journal entry negative? (i.e. does it contain negative emotions?).'),
  subject: z.string().describe('the subject of the journal entry.'),
  summary: z.string().describe('quick summary of the entire entry.'),
  sentimentScore: z
    .number()
    .describe(
      'sentiment of the text and rated on a scale from -10 to 10, ' +
        'where -10 is extremely negative, 0 is neutral, ' +
        'and 10 is extremely positive.',
    ),
})
const parser = StructuredOutputParser.fromZodSchema(answerSchema)

export const analyze = async (prompt: string) => {
  const model = new OpenAI({
    temperature: 0,
    modelName: 'gpt-3.5-turbo',
  })

  // const result = await model.call(prompt)

  // console.log(result)
}
