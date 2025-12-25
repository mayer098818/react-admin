import { Form, Input, Row, Col, Select, Button } from 'antd'
import type { ReactNode } from 'react'
import { useForm } from 'react-hook-form'

type FieldType = 'input' | 'textarea' | 'select' | 'date' | 'number'

type FieldSchema = {
  type: FieldType
  name: string
  label: string
  col?: number | 'full' // 默认 12（两列），'full' 表示整行
  placeholder?: string
  options?: Array<{ label: string; value: string | number }>
}

const formSchema: FieldSchema[] = [
  {
    type: 'input',
    name: 'firstName',
    label: 'First Name',
    placeholder: 'Enter first name'
  },
  {
    type: 'input',
    name: 'lastName',
    label: 'Last Name'
  }
]
type FormSection = {
  key: string
  title: string
  columns: number
  fields: FieldSchema[]
}
const options = [
  {
    label: 'Happy',
    value: 'happy',
    emoji: '😄',
    desc: 'Feeling Good'
  },
  {
    label: 'Sad',
    value: 'sad',
    emoji: '😢',
    desc: 'Feeling Blue'
  },
  {
    label: 'Angry',
    value: 'angry',
    emoji: '😡',
    desc: 'Furious'
  },
  {
    label: 'Cool',
    value: 'cool',
    emoji: '😎',
    desc: 'Chilling'
  },
  {
    label: 'Sleepy',
    value: 'sleepy',
    emoji: '😴',
    desc: 'Need Sleep'
  }
]
const formData: FormSection[] = [
  {
    key: 'social',
    title: 'Social Link',
    columns: 2,
    fields: [
      { name: 'facebook', label: 'Facebook', type: 'input' },
      { name: 'twitter', label: 'Twitter', type: 'input' },
      { name: 'linkedin', label: 'LinkedIn', type: 'input' },
      { name: 'instagram', label: 'Instagram', type: 'input' }
    ]
  },
  {
    key: 'personal',
    title: 'Personal Information',
    columns: 2,
    fields: [
      { name: 'firstName', label: 'First Name', type: 'input' },
      { name: 'lastName', label: 'Last Name', type: 'input' },
      { name: 'email', label: 'Email', type: 'input', col: 'full' },
      {
        name: 'Select',
        label: 'Select',
        type: 'select',
        options: [
          {
            label: 'Happy',
            value: 'happy'
          },
          {
            label: 'Sad',
            value: 'sad'
          },
          {
            label: 'Angry',
            value: 'angry'
          },
          {
            label: 'Cool',
            value: 'cool'
          },
          {
            label: 'Sleepy',
            value: 'sleepy'
          }
        ]
      }
    ]
  }
]

const FormComponent: React.FC = () => {
  const { handleSubmit, register } = useForm()
  const onSubmit = (values: any) => {
    console.log(values, 'vale')
  }
  function renderField(field: FieldSchema): ReactNode {
    if (!field.type) return null

    switch (field.type) {
      case 'input':
        return (
          <>
            <label className="mb-1.5 block text-sm font-medium text-gray-700 dark:text-gray-400">{field.label}</label>
            <input
              className="h-11 w-full rounded-lg border appearance-none px-4 py-2.5 text-sm shadow-theme-xs placeholder:text-gray-400 focus:outline-hidden focus:ring-3  dark:bg-gray-900 dark:text-white/90 dark:placeholder:text-white/30  bg-transparent text-gray-800 border-gray-300 focus:border-brand-300 focus:ring-brand-500/20 dark:border-gray-700 dark:text-white/90  dark:focus:border-brand-800"
              {...register(field.name)}
              placeholder={field.placeholder}
            />
          </>
        )
      case 'select':
        return (
          <>
            <label className="mb-1.5 block text-sm font-medium text-gray-700 dark:text-gray-400">{field.label}</label>
            <select className="h-11 w-full rounded-lg border appearance-none px-4 py-2.5 text-sm shadow-theme-xs placeholder:text-gray-400 focus:outline-hidden focus:ring-3  dark:bg-gray-900 dark:text-white/90 dark:placeholder:text-white/30  bg-transparent text-gray-800 border-gray-300 focus:border-brand-300 focus:ring-brand-500/20 dark:border-gray-700 dark:text-white/90  dark:focus:border-brand-800">
              {field.options?.map((option, index) => (
                <option
                  className="h-11 w-full rounded-lg border appearance-none px-4 py-2.5 text-sm shadow-theme-xs placeholder:text-gray-400 focus:outline-hidden focus:ring-3  dark:bg-gray-900 dark:text-white/90 dark:placeholder:text-white/30  bg-transparent text-gray-800 border-gray-300 focus:border-brand-300 focus:ring-brand-500/20 dark:border-gray-700 dark:text-white/90  dark:focus:border-brand-800"
                  value={option.value}
                  key={index}>
                  {option.value}
                </option>
              ))}
            </select>
          </>
        )
      // case 'textarea':
      //   return <textarea placeholder={field.placeholder} rows={4} />
      // case 'number':
      //   return <input type="number" placeholder={field.placeholder} />
      // case 'select':
      //   if (!field.options || field.options.length === 0) {
      //     return <select placeholder="No options available" disabled />
      //   }
      //   console.log(field.options, 'options')
      //   return <select placeholder={field.placeholder || 'Please select'} options={field.options} />

      default:
        return null
    }
  }
  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      {formData.map(section => (
        <div className="mt-7" key={section.key}>
          <div className="px-2 pr-14">
            <h5 className="mb-5 text-lg font-medium text-gray-800 dark:text-white/90 lg:mb-6">{section.title}</h5>

            <Row gutter={24}>
              {section.fields.map(field => (
                <Col xs={24} lg={field.col === 'full' ? 24 : 12} key={field.name}>
                  {renderField(field)}
                </Col>
              ))}
            </Row>
          </div>
        </div>
      ))}
      <div className="flex items-center gap-3 px-2 mt-6 lg:justify-end">
        <button className="inline-flex items-center justify-center gap-2 rounded-lg transition  px-4 py-3 text-sm bg-brand-500 text-white shadow-theme-xs hover:bg-brand-600 disabled:bg-brand-300" type="submit">
          Save Changes
        </button>
      </div>
    </form>
  )
}

export default FormComponent
