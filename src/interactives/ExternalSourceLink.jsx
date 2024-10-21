import React, {useState} from 'react';
import styles from '../css/ExternalSourceLink.module.css';

const ExternalSourceLink = ({receivedInfo, updateInteractive, interactive}) => {
const [data, setData] = useState({
  "external_source_link_description": receivedInfo.external_source_link_description,
  "external_source_url": receivedInfo.external_source_url,
});


const changeHandler = (event) => {
  const {name, value} = event.target;
  let newData = {...data, [name] : value};
    updateInteractive({...interactive, receivedInfo : newData});
    setData(prev => ({...prev, [name] : value }));
  };

  return (
    <div className={styles["external-source-form"]}>
      <p>Описание ссылки: &nbsp;</p>
      <textarea
        placeholder="Введите текст для ссылки"
        name="external_source_link_description"
        rows={5}
        cols={5}
        onChange={changeHandler}
        value={data.external_source_link_description}
        required
      ></textarea>
      <p>Ссылка на внешний ресурс / PDF-документ:&nbsp;</p>
      <input
        name="external_source_url"
        onChange={changeHandler}
        type="text"
        placeholder="URL: https://"
        value={data.external_source_url}
        required
      />
    </div>
  )
}

export default ExternalSourceLink