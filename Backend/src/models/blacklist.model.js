const moonoose = require('mongoose');

const blacklistSchema = new moonoose.Schema({
    token:{
        type:String,
        required:[true, 'Token is required to blacklist'],
    }
},{
        timestamps:true,
    }
);

const tokenBlacklistModel = moonoose.model('BlacklistToken', blacklistSchema);

module.exports = tokenBlacklistModel;