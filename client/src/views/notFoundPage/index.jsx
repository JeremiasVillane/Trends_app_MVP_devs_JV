import { Link } from "react-router-dom";
import './notFoundPage.css'

export default function NotFoundPage() {
  return(
    <main className="NotFoundContainer">
      <p>La página no existe</p>
      <Link to="/">
        Regresar
      </Link>
    </main>
  )
}