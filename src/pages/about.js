import group from '../assets/group.png'

export default function About() {
    return (
        <div className="flex flex-column mt-20 px-10 pr-30" id="about">
            <div className="flex-1">
                <div>
                    <img src={group} />
                </div>
            </div>
            <div className="flex-1 mt-10">
                <h1 className="text-3xl font-bold text-slate-800 text-left ml-24 my-10">Our Goal</h1>
                <p className="text-left text-slate-800 text-md ml-24">is to assist businesses across various <br />
                    industries to enter the era of data by <br />
                    providing a complete solution using<br />
                    the most advanced data technologies.</p>
            </div>
        </div>
    )
}