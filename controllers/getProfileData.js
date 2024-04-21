const AccountInfo = require('../models/accountInfo.model');

module.exports.getProfileData = async (userId) => {
    
    try {        
        const details = await AccountInfo.findOne({ user: userId }).populate('user', '-password');
        if (!details) throw new Error('user details not found');

        const profileData = {
            firstName: details.user?.firstName,
            lastName: details.user?.lastName,
            email: details.user?.email,
            phoneNo: details.user?.phoneNo,
            savingsBal: details.user?.savingsBal,
            checkingBal: details.user?.checking,
            address: details.user?.address,
            savings: details.savingsAccount?.accountNumber,
            checking: details.checkingAccount?.accountNumber,
            routingNo: details.routingNumber,
        };
        return profileData;
    } catch (err) {
        console.log(err);
        return 'details not found'
    }
}