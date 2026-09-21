import {useAuth} from "../../context/AuthContext"
export default function Profile() {
    const { user, updateUser } = useAuth();
    
    async function handleSubmit(event) {
        const check = confirm("Do you really want to update your details");
        if(!check) return;
        const formData = new FormData(event.target);
        const name = formData.get('name');
        const oldPassword = formData.get('oldPassword');
        const newPassword = formData.get('newPassword');
        const confirmPassword = formData.get('confirmPassword');

        if(oldPassword !== user.password) {
            alert("Old password is incorrect.");
            return;
        }

         if(newPassword !== confirmPassword) {
            alert("New password and confirm password do not match.");
            return;
        }

        if(oldPassword === newPassword){
            alert("New password should be different");
            return;
        }

        // Update user details
        const updatedDetails ={
            name : name,
            password: newPassword
        }
        
       await updateUser(user.id, updatedDetails);

    }

    return (
        <>
        <h1>My Profile</h1>
         <form >
            <div>
            <input type="text" name="email" placeholder="email" value={user.email} required/>
             <input type="text" name="name" placeholder="Name" defaultValue={user.name} required/>
            <br />
            <input type="text" name="oldPassword" placeholder="Old Password" required/>
            <br/>
            <input type="password" name="newPassword" placeholder="NewPassword" required/>
            <input type="password" name="confirmPassword" placeholder="Confirm Password" required/>
            </div>
            <button type="submit" className="btn-primary" onClick={handleSubmit} >Update details</button>
        </form>
        </>
    )
}