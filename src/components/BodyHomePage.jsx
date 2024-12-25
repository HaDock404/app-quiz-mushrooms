import '../styles/homepage.css'
import QuizCard from './QuizCard'

function BodyHomePage() {
    return (
        <section className="body_homepage_section">
            <article className='body_homepage_article_header'>
                <span className='body_homepage_article_header_title'>Quiz Management</span>
            </article>
            <QuizCard
                to="/quiz"
                data="quiz_01.json"
                title="Reconocimiento Hongos lvl 1"
                text="Practice finding the names of the mushrooms in order."
                difficulty="easy"
                color="#94C788"
                order="ordered"
            />
            <QuizCard 
                to="/random-quiz"
                data="quiz_01.json"
                title="Reconocimiento Hongos lvl 2"
                text="Practice finding the names of the mushrooms in random order."
                difficulty="medium"
                color="#C7BD88"
                order="disorderly"
            />
        </section>
    )
}

export default BodyHomePage