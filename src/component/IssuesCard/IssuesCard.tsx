// type
import { IssueData } from '../../types';

// css
import './IssuesCard.css'

const IssuesCard = ({ Data }: {Data: IssueData}): JSX.Element => {

    const createdTime = new Date(Data.created_at);

    return (
        <div className='issuesCard'>
            {
                Data?.pull_request !== undefined
                ? <div className='sort pull_sort'>PULL REQUESTS</div>
                : <div className='sort issues_sort'>ISSUES</div>
            }   
            <a className='content' href={Data.html_url} target='_blank' rel='noopener noreferrer'>
                <div className='projectNameWrap'>
                    <div className='projectName'>{Data.repository_url.replace('https://api.github.com/repos/', '')}</div>
                    <div className='labels'>
                        {
                            Data.labels.map((label, index) => {
                                return (
                                    <div key={index} className='label' style={{ backgroundColor: `#${label.color}` }}>{label.name}</div>
                                )
                            })
                        }
                    </div>
                </div>    
                <p className='title'>{Data.title}</p>
                <p className='date'>#{Data.number} opend on {createdTime.getMonth() + 1}/{createdTime.getDate() + 1} by {Data.user.login}</p>
            </a>
            
        </div>
    )

}

export default IssuesCard;