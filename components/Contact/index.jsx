import React, {useState} from 'react'

import IconArrowDown from './IconArrowDown'

import classes from './styles.scss'

function Contact() {
  const [emailVisible, setEmailVisible] = useState(false)
  const [phoneVisible, setPhoneVisible] = useState(false)

  function showEmail(event) {
    event.preventDefault()
    setEmailVisible(true)
  }

  function showPhone(event) {
    event.preventDefault()
    setPhoneVisible(true)
  }

  return (
    <>
      <p>
        Pour plus d'informations, n'hésitez pas à me contacter par mail (
        {emailVisible ? (
          <a href="mailto:clement.douin@posteo.net">clement.douin@posteo.net</a>
        ) : (
          <a href="/job" onClick={showEmail}>
            AFFICHER
          </a>
        )}
        ), par téléphone (
        {phoneVisible ? (
          <a href="tel:+33 6 30 34 35 47">+33 6 30 34 35 47</a>
        ) : (
          <a href="/job" onClick={showPhone}>
            AFFICHER
          </a>
        )}
        ) ou via l'un des réseaux sociaux situés juste en dessous
        <IconArrowDown className={classes.icon} />
      </p>
    </>
  )
}

export default Contact
