import { Link } from "react-router-dom";
import './notFoundPage.css'

export default function NotFoundPage() {
  return(
    <main className="NotFoundContainer">
      <p>This page does not exist</p>
      <Link to="/">
        Back to home
      </Link>
    </main>
  )
}