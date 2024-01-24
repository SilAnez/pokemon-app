import { useRef } from "react"
import { setTrainerG } from "../store/states/trainer.state"
import { useDispatch } from "react-redux"
import { useNavigate } from "react-router-dom"
import '../components/HomePage/styles/HomePage.css'

const HomePage = () => {

  const inputTrainer = useRef()
  const dispatch = useDispatch()

  const navigate = useNavigate()

  const handleSubmit = e =>{
    e.preventDefault()
    dispatch(setTrainerG( inputTrainer.current.value.trim()))
    navigate('/pokedex')
  }
  return (
    <div className="homePage">
        <img className="homePage__img" src="./pokedex-removebg-preview.png" alt="" />
        <section className="homePage__trainer__salute">
        <h2 className="homePage__salute">Hi Trainer!</h2>
        <p className="homePage__phrase"> To start this app, give me your trainer name</p>
        </section>
        <form className="homePage__form" onSubmit={handleSubmit}>
            <input className="homePage__input" ref={inputTrainer} type="text" placeholder="Your name..." />
            <button className="homePage__button">Catch them all!</button>
        </form>
    </div>
  )
}

export default HomePage