const pageUrl = document.location.href;

const avatarModal = document.querySelector('#avatar_modal')

const openAvatarModal = (e) => {
    avatarModal.showModal();
}
const closeAvatarModal = (e) => {
    avatarModal.close();
}

document.querySelector('#upload_form').addEventListener('submit', async (e) => {
    e.preventDefault()
    const formData = new FormData();
    const fileField = document.querySelector('input[type="file"]');

    formData.append('avatar', fileField.files[0]);
    const uploadUrl = `${pageUrl}/avatar-upload`

    try {
        const res = await fetch(uploadUrl, {
            method: 'PUT',
            body: formData
        })
        const result = await res.json()
        alert(result.message);
        
        if (res.ok && result.image) {
            document.location.href = pageUrl
        }
    } catch (error) {
        console.log(error);
    }
})
