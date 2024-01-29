const btn = document.querySelector('.search-btn')
const bulb = document.querySelector('.bulb')
const search = document.querySelector('#search')
const avatar = document.querySelector('#imgavatar')
const nameS = document.querySelector('.name')
const url_link = document.querySelector('.link')
const desc = document.querySelector('.desc')
const joined_date = document.querySelector('.joined-date')
const repos = document.querySelector('.repos-data')
const followers = document.querySelector('.followers-data')
const following = document.querySelector('.following-data')
const lctn=document.querySelector('.location')
const tweet = document.querySelector('.tweet')
const err_msg = document.querySelector('#err-msg')
const months = ['Jan','Feb','March','April','May','June','July','Aug','Sep','Oct','Nov','Dec']

async function searchFn()
{
    
    try{
    
    const tobesearch = search.value
    const resp = await fetch(`https://api.github.com/users/${tobesearch}`)
    if(!resp.ok)
    {
        throw new Error('Not Found')
    }

    const data = await resp.json()
    console.log(data)
    avatar.src = data.avatar_url;
    nameS.innerHTML = data.name === null ? data.login : data.name
    url_link.href = data.html_url
    url_link.innerHTML = '@'+data.login
    desc.innerHTML = data.bio === null?'Bio Not Available':data.bio
    repos.innerHTML = data.public_repos
    followers.innerHTML = data.followers
    following.innerHTML = data.following
    lctn.innerHTML = data.location === null?'Not Available':data.location
    tweet.href = data.twitter_username === null?'Not Available':data.twitter_username
    tweet.innerHTML =data.twitter_username === null?'Not Available':'@'+data.twitter_username
    console.log(data.created_at)
    let ndate = data.created_at.split('T')[0].split('-')
    console.log(ndate)
    joined_date.innerHTML = 'Joined on '+ndate[2]+' '+months[parseInt(ndate[1])]+' '+ndate[0]
    }
    catch(err)
    {
        console.error(err)
        cross.classList.add('dp')
        err_msg.classList.remove('dp')
    }
}




const cross = document.querySelector('#cross')
function crossfn()
{
    search.value = ''
    cross.classList.add('dp')
}
cross.addEventListener('click',crossfn)

function gadbadfn()
{
    err_msg.classList.add('dp')
    cross.classList.remove('dp')
}

btn.addEventListener('click',searchFn)
search.addEventListener('input',gadbadfn)

search.addEventListener('keydown',(e)=>{
    if(e.key == 'Enter')
    {
        e.preventDefault()
        searchFn()
    }
})

const theme = document.querySelector('#theme-style')


function toggleTheme()
{
    const blbsrc = bulb.src
    if(blbsrc.includes('darkbulb'))
    {
        bulb.src = './images/lightbulb (1).png'
        theme.setAttribute('href','./StyleSheets/dark-theme.css')
    }
    else
    {
        bulb.src = './images/darkbulb.png'
        theme.setAttribute('href','./StyleSheets/light-theme.css')
    }
}

bulb.addEventListener('click',toggleTheme)
