import earthImage from '../assets/earth-datasintesa.png'
import { Link, Element } from 'react-scroll'
import Graph from '../components/graph';

export default function Home() {

    return (
        <div>
            <div className="flex flex-column mt-24 px-10" id="home">
                <div className="flex-1 mt-10">
                    <h1 className="text-5xl font-bold text-slate-800 text-left ml-24 my-10">Transform Bussines Through Data</h1>
                    <p className="text-left text-slate-800 text-xl ml-24">Datasintesa consists of young, creative, and motivated human being trying to enrich the lives of others, believing that Big Data and its Analytics could make earth a better place.</p>
                    <Link activeClass="active" className="test2" to="graph" spy={true} smooth={true} duration={500}>
                        <div
                            className="border rounded-full bg-sky-500 hover:bg-sky-300 hover:text-black w-80 h-16 ml-24 my-20">
                            <p className="text-white text-xl text-center mt-4">Get Graph</p>

                        </div>
                    </Link>
                </div>
                <div className="flex-1 App-logo">
                    <img src={earthImage} alt="earth" />
                </div>
            </div>
            <Element name="graph" className="element bg-slate-100 p-20 w-100%">
                <Graph />
            </Element>
        </div>
    )
}
