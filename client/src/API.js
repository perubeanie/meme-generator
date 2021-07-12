async function logIn(credentials) {
    let response = await fetch('/api/login', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(credentials),
    });
    if(response.ok) {
        const user = await response.json();
        return user;
      }
      else {
        try {
          const errDetail = await response.json();
          throw errDetail.message;
        }
        catch(err) {
          throw err;
        }
      }
}

async function logOut() {
    await fetch('/api/logout/current', { method: 'DELETE' });
} 

async function loadAllMemes () {
    const response = await fetch('/api/memes');
    const memes = await response.json();
    return memes;
}

async function loadPublicMemes() {
    const response = await fetch('/api/publicMemes');
    const publicMemes = await response.json();
    return publicMemes;
}

async function createMeme(meme) {
    await fetch('/api/memes/createMeme', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(meme)
    });
}

async function deleteMeme(id) {
    await fetch('/api/memes/deleteMeme/' + id, {
        method: 'DELETE',
    });
}

const API = { logIn, logOut, loadAllMemes, loadPublicMemes, deleteMeme, createMeme };
export default API;