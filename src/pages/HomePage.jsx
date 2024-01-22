import { useRef } from "react"
import { setTrainerG } from "../store/states/trainer.state"
import { useDispatch } from "react-redux"
import { useNavigate } from "react-router-dom"

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
    <div>
        <h1>Pokedex</h1>
        <h2>Hi Trainer!</h2>
        <p> To start this app, give me your trainer name</p>
        <form onSubmit={handleSubmit}>
            <input ref={inputTrainer} type="text" />
            <button>Catch them all!</button>
        </form>
    </div>
  )
}

export default HomePage