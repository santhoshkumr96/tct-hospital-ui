import { React , useEffect , useState} from 'react';
import './SurveyPage.css'

const SurveyTakeSeciton = () => {

  const [surveyId, setSurveyId] = useState(-1);
  const [personId, setPersonId] = useState(-1);
  const [userId, setUserId] = useState(-1);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search)
    setSurveyId(params.get('surveyId'))
    setPersonId(params.get('personId'))
    setUserId(params.get('userId'))
  }, [])

  return (

    <div className="add-user-wrapper-wrapper">
      <p>soemthing</p>
    </div>

  )
}

export default SurveyTakeSeciton;