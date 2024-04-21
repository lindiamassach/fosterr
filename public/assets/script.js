const pageOrigin = document.location.origin;

window.onload = async (e) => {
    try {
        const res = await fetch(`${pageOrigin}/get-image`)
        const result = await res.json()

        if (result.image) {
            document.querySelector('.user_avatar').src = `assets/images/uploaded_avatar/${result.image}`
        }
    } catch (error) {
        console.log(error);
    }
}

const logoutBtn = document.querySelector('.signout_btn');

logoutBtn.addEventListener('click', async () => {
    const req = await fetch('/signout');
    if (req.ok) {
        if (req.redirected) location.href = '/';
    }
});

const asideModal = document.querySelector('#aside_modal')

const openAsideModal = (e) => {
    asideModal.showModal();
}
const closeAsideModal = (e) => {
    asideModal.close();
}
