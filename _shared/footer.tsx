import React, {FC, Fragment} from "react"

import Link from "./link"

import classes from "./footer.scss"

const medias = [
  {name: "LinkedIn", href: "https://www.linkedin.com/in/soywod"},
  {name: "Malt", href: "https://www.malt.fr/profile/soywod"},
  {name: "GitHub", href: "https://github.com/soywod"},
  {name: "Stack Overflow", href: "https://stackoverflow.com/users/6213048/soywod"},
  {name: "Twitter", href: "https://twitter.com/soywod"},
]

const Footer: FC = () => {
  return (
    <>
      <hr />
      <footer className={classes.footer}>
        <div>
          <Link to="/contact" className={classes.recruit}>
            <span>Recrutez-moi !</span>
            <span className={classes.available}>
              Actuellement disponible
              <svg className={classes.status} viewBox="0 0 100 100">
                <circle cx="50" cy="50" r="50" />
              </svg>
            </span>
          </Link>
        </div>
        <div className={classes.socials}>
          {medias.map(({name, href}, index) => (
            <Fragment key={name}>
              {index > 0 && <span className={classes.separator}>{" / "}</span>}
              <Link to={href} className={classes.social}>
                {name}
              </Link>
            </Fragment>
          ))}
        </div>
      </footer>
    </>
  )
}

export default Footer
