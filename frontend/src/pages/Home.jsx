import { useEffect, useState } from "react"

// components
import WorkoutForm from "../components/WorkoutForm"
import WorkoutDetails from "../components/WorkoutDetails"

const Home = () => {
    const [workouts, setWorkouts] = useState(null)

    useEffect(() => {
        const fetchWorkouts = async () => {
            const response = await fetch('/api/workouts')
            const json = await response.json()
            // console.log(json)
            if (response.ok) {
                setWorkouts(json)
            }
        }

        fetchWorkouts()
    }, [])

    return (<>
        <div className="home">
            <div className="workouts">
                {workouts && workouts.map(workout => (
                    <WorkoutDetails workout={workout} key={workout.id} />
                ))}
            </div>
            <WorkoutForm />
        </div>
    </>
    )
}

export default Home