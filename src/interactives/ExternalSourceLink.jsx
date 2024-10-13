import React from 'react'

const ExternalSourceLink = ({interactive, updateInteractive}) => {
  return (
    <div>
      <p>Описание ссылки: &nbsp;</p>
      <textarea
        placeholder="Введите текст для ссылки"
        name="external_source_link_description"
        rows={5}
        cols={5}
        onChange={event => updateInteractive({...interactive, 'external_source_link_description' : event.target.value})}
        required
      ></textarea>
      <p>Ссылка на внешний ресурс / PDF-документ:&nbsp;</p>
      <input
        name="external_source_url"
        onChange={event => updateInteractive({...interactive, 'external_source_link_description' : event.target.value})}
        type="text"
        placeholder="URL: https://"
        required
      />
    </div>
  )
}

export default ExternalSourceLink