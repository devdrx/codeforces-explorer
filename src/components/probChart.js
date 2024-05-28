import axios from 'axios';
import { useAuth } from "../Auth/AuthContext";
import BarChartComponent from './BarChart';
var problems = new Map();
var ratings = new Map();
var tags = new Map();

var rating_min = -1;
var rating_max = -1;
var date_min = -1;
var date_max = -1;


export default function ProbChart(){
    const authContext = useAuth();
    const textfield = document.getElementsByClassName("rt-TextFieldInput");
    console.log(textfield.value);
    async function getSubmissions(){
        const username = "hitvrth";
        console.log(username)
        const response = await axios.get(`https://codeforces.com/api/user.status?handle=${username}`)
        const res = response.data.result;
        processData(res);
        console.log(ratings)
        // console.log(ratings)
        // console.log(tags)
        // console.log(ratingChartLabel)
        // console.log(ratingChartData)
    }

    function processData(resultArr){
        for(var i = resultArr.length-1;i>=0;i--){
          var sub = resultArr[i];
          var problemId = sub.problem.contestId+'-'+sub.problem.index;
          if(!problems.has(problemId)){
            problems.set(problemId,{
              solved: false,
              use: false,
              rating: sub.problem.rating,
              contestId: sub.problem.contestId,
              index: sub.problem.index,
              tags: sub.problem.tags,
              date: sub.creationTimeSeconds
            });
          }
          let obj = problems.get(problemId);
          
          if (obj.rating && 
             (obj.rating >= rating_min || rating_min == -1) &&
             (obj.rating <= rating_max || rating_max == -1) && 
             (obj.date >= date_min || date_min == -1) && 
             (obj.date < date_max || date_max == -1))
            obj.use = true;
            
          if(sub.verdict=="OK")
            obj.solved = true;
          
            problems.set(problemId,obj);
        }
        let unsolvedCount = 0;
        problems.forEach(function(prob){
          if (prob.use){
            if(prob.rating && prob.solved===true){
              if(!ratings.has(prob.rating)){
                ratings.set(prob.rating,0);
              }
              let cnt = ratings.get(prob.rating);
              cnt++;
              ratings.set(prob.rating,cnt);
            }
            if(prob.solved===false){
              unsolvedCount++;
            }
            if(prob.solved===true){
              prob.tags.forEach(function(tag){
                if(!tags.has(tag)){
                  tags.set(tag,0);
                }
                let cnt = tags.get(tag);
                cnt++;
                tags.set(tag,cnt);
              })
            }
          }
        })
    }
    getSubmissions();
    return (
        <div>
            <h1>Prob Chart</h1>
            <BarChartComponent data={ratings}/>
        </div>
    )
}