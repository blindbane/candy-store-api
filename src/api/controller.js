const getVendors = (req, res) => {
  res.json({ 
    vendors: [
      { id: '1', webAddress: 'www.example.com' }, 
      { id: '2', webAddress: 'www.example.com' }
    ]
  })
}

const postVendor = (req, res) => {
  res.send({ "NotReady": 'try again' })
}

module.exports = {
  getVendors,
  postVendor
}