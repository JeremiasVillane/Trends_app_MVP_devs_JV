import { Link } from "react-router-dom";
import './notFoundPage.css'

export default function NotFoundPage() {
  return(
    <main className="NotFoundContainer">
      <p>This page does not exist</p>
      <Link to="/Trends_app_MVP">
        Back to home
      </Link>
    </main>
  )
}