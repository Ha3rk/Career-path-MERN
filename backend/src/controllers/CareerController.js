const { INIT_DATA } = require('../InitialData');
const Career = require('../models/Career');

module.exports = {
  async getCareerById(req, res) {
    console.log('getCareerById', req.body);

    const { careerId } = req.params;

    try {
      const career = await Career.findById(careerId);
      return res.json(career);
    } catch (error) {
      return res.status(400).json({
        message: 'Career ID does not exist',
      });
    }
  },

  async getAllCareers(req, res) {
    console.log('getAllCareers', req.body);

    Career.find({}).then(function (careers) {
      res.send(careers);
    });
  },

  async createCareer(req, res) {
    console.log('createCareer', req.body);
    const { title, description, url, parents, children } = req.body;

    const career = await createCareerLogic(
      title,
      description,
      url,
      parents,
      children
    );

    return res.json(career);
  },

  async updateCareer(req, res) {
    console.log('updateCareer', req.body);

    const { careerId } = req.params;
    const { title, description, url, parents, children } = req.body;

    const prevCareer = await Career.findById(careerId);

    const getNewerVal = (newVal, prevVal) =>
      !!newVal && newVal !== prevVal ? newVal : prevVal;

    const updateObj = {};
    updateObj['title'] = getNewerVal(title, prevCareer.title);
    updateObj['description'] = getNewerVal(description, prevCareer.description);
    updateObj['url'] = getNewerVal(url, prevCareer.url);
    updateObj['parents'] = getNewerVal(parents, prevCareer.parents);
    updateObj['children'] = getNewerVal(children, prevCareer.children);

    const career = await Career.findByIdAndUpdate(careerId, updateObj);

    if (!!parents && parents.length) {
      for (const parent of parents) {
        const parentsDoc = await Career.findById(parent);
        if (!parentsDoc) continue;

        const newChildList = [...parentsDoc.children];

        if (!newChildList.includes(career._id)) newChildList.push(career._id);

        await Career.findByIdAndUpdate(parent, {
          $set: { children: newChildList },
        });
      }
    }

    if (!!children && children.length) {
      for (const child of children) {
        const childDoc = await Career.findById(child);
        if (!childDoc) continue;

        const newParentList = [...childDoc.parents];

        if (!newParentList.includes(career._id)) newParentList.push(career._id);

        await Career.findByIdAndUpdate(child, {
          $set: { parents: newParentList },
        });
      }
    }

    return res.json(career);
  },

  async deleteCareerById(req, res) {
    console.log('deleteCareerById', req.body);

    const { careerId } = req.params;

    try {
      await Career.deleteOne({ _id: careerId });
      return res.status(200).json({ message: 'Success' });
    } catch (error) {
      return res.status(400).json({
        message: 'Error: ' + error,
      });
    }
  },

  async deleteCareerAll(req, res) {
    console.log('deleteCareerAll', req.body);

    try {
      await Career.deleteMany({});
      return res.status(200).json({ message: 'Success' });
    } catch (error) {
      return res.status(400).json({
        message: 'Error: ' + error,
      });
    }
  },

  async loadData(req, res) {
    console.log('loadData', req.body);
    const rawData = INIT_DATA;

    // map csv data to objects
    let localData = rawData.map((d) => {
      return {
        idx: d[0],
        title: d[1],
        description: d[2],
        url: d[3],
        parentIdx: d[4],
        dbId: null,
      };
    });

    // map data with DB document ids
    for (const data of localData) {
      let career = await Career.findOne({ title: data.title });
      if (!career) {
        career = await createCareerLogic(
          data.title,
          data.description,
          data.url,
          [],
          []
        );
      }
      data.dbId = career.id;
    }

    // go through localData to find a list of child documents for each record
    localData = localData.filter((d) => !!d.dbId);

    for (const d of localData) {
      const childrenIdList = localData
        .filter((f) => f.parentIdx === d.idx)
        .map((i) => i.dbId);

      const parentIdList =
        d.parentIdx !== 0
          ? localData.filter((f) => f.idx === d.parentIdx).map((i) => i.dbId)
          : [];

      const c = await Career.findByIdAndUpdate(d.dbId, {
        $set: { children: childrenIdList, parents: parentIdList },
      });
    }

    return res.status(200).json(localData);
  },
};
async function createCareerLogic(title, description, url, parents, children) {
  const c = await Career.findOne({ title });
  if (!!c) return;

  const career = await Career.create({
    title,
    description,
    url,
    parents,
    children,
  });

  for (const parent of parents) {
    const parentsDoc = await Career.findById(parent);
    if (!parentsDoc) continue;

    const newChildList = [...parentsDoc.children];

    if (!newChildList.includes(career._id)) newChildList.push(career._id);

    await Career.findByIdAndUpdate(parent, {
      $set: { children: newChildList },
    });
  }

  for (const child of children) {
    const childDoc = await Career.findById(child);
    if (!childDoc) continue;

    const newParentList = [...childDoc.parents];

    if (!newParentList.includes(career._id)) newParentList.push(career._id);

    await Career.findByIdAndUpdate(child, {
      $set: { parents: newParentList },
    });
  }
  return career;
}
