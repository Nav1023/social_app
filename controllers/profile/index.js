
const Profile = require('../../models/Profile');

const  profileController = {
  test: (req, res) => {
    res.status(200).send("welcome to Profile controller");
  },
  createUpdateProfile : async (req, res) =>  {
    const {
      description,
      githubusername,
      skills,
      youtube,
      facebook,
      twitter,
      linkedin,
    } = req.body;

    const profileObj = {};
    profileObj.user = req.userId;
    if(description) profileObj.description = description;
    if(githubusername) profileObj.githubusername = githubusername;

    profileObj.social = {};
    if(youtube) profileObj.social.youtube = youtube;
    if(facebook) profileObj.social.facebook = facebook;
    if(twitter) profileObj.social.twitter = twitter;
    if(linkedin) profileObj.social.linkedin = linkedin;
    if(skills){
      // "react, nodejs, javascript "
        profileObj.skills = skills.split(',').map((skill)=> skill.trim());
    }


    try{
      let profile = await Profile.findOne({ user: req.userId}); 

      if(profile){
        // updating the record

        profile = await Profile.findOneAndUpdate({user: req.userId}, {$set : profileObj}, {new : true});
        return res.status(200).send({ message: "created/Updated Profile", data: profile});        
      }
      
      profile = new Profile(profileObj);
      await profile.save();
      return res.status(200).send({ message: "created/Updated Profile", data: profile});
    } catch(err){
      res.status(500).send({ message: "Server Error",});

    }

  },
  fetchAllProfiles: async (req, res) => {
    try{
      let profiles = await Profile.find({},{"description": 1, "_id": 0}).populate('user', ['email']);
      // profiles = profiles.map((profile) => {
      //   return {
      //     user: profile.user,
      //     description: profile.description
      //   }
      // })
      res.status(200).send({ 
        message: "fetched the records",
        data: profiles
    })
    }catch(err){
      console.log('errror', err);
      res.status(500).send({ message: "Server Error",});
    }
  },
  fetchProfileById: async (req, res) => {
    try {
      const profile = await Profile.findOne({ user: req.params.id}, {"_id":0, "__v": 0, "date": 0});
      res.status(200).send({ 
        message: "fetched the record",
        data: profile
    })
    } catch (error) {
      res.status(500).send({ message: "Server Error",});
    }
  },
  updateEducation: async(req, res) => {
    try {
      
      const {
        school,
        degree,
        to,
        from,
        description,
        current
      } = req.body;

      const newEducation = {
        school,
        degree,
        to,
        from,
        description,
        current
      };
      let profile = await Profile.findOne({ user: req.userId}); 

      profile.education.unshift(newEducation);
      await profile.save();
      res.status(200).send({message: "added education", data: profile});

    } catch (error) {
      res.status(500).send({ message: "Server Error",});      
    }
  },
  deleteEducation: async(req, res) => {
    try{
      let profile = await Profile.findOne({ user: req.userId});
      const education = profile.education;
      const index = education.findIndex((val) => val._id == req.params.id);
      profile.education = education.splice(index, 1);

      await profile.save();
      res.status(200).send({message: "removed education", data: profile});      
    } catch(err){
      res.status(500).send({ message: "Server Error",});      
    }

  }

}

module.exports = profileController;

