import React from 'react'

import classes from './styles.scss'

function Pricing() {
  return (
    <table className={classes.table}>
      <thead>
        <tr>
          <th>Par heure</th>
          <th>Par jour</th>
          <th>Par prestation</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>75 €</td>
          <td>600 €</td>
          <td>Sur devis</td>
        </tr>
      </tbody>
    </table>
  )
}

export default Pricing
