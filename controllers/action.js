const User = require("../models/userModels/users")

const getAllUsers = async (req,res) => {
    try{
        const users = await User.find().sort({createdAt: -1})
        if(!users){
            console.log('No users')
            return res.status(303).json({message: 'No users available', error: false})
        }
        console.log(users)
        return res.json({Users: users})
    }catch(error){
        console.log('error fetching users')
        console.log(error)
        return res.status(303).json({message: 'Error fetching users', error: true})

    }
}

const deleteUser = async (req, res) => {
    try {
        const user = await User.findByIdAndDelete(req.params.id);
        console.log('user delete',user)
        return res.json({ message: 'User deleted successfully' });
    } catch (error) {
        console.log(error.message)
        return res.status(500).json({ message: error.message });
    }
}

const disableUser = async (req, res) => {
    try {
        const {_id} = req.params
        const {active} = req.body
        const user = await User.findById(_id);
        if (!user) return res.status(404).json({ message: 'User not found' ,error:true});
        console.log(user)
        user.active = active;
        await user.save();

        res.json({ message: 'User status updated successfully' });
    } catch (error) {
        res.status(500).json({ message: error.message, error:true });
    }
}

module.exports={
    getAllUsers,
    deleteUser,
    disableUser
}