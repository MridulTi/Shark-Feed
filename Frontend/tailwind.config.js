const withMT = require("@material-tailwind/react/utils/withMT");
 
module.exports = withMT({
  content: ["./index.html", "./src/**/*.{vue,js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors:{
        'base':{
          'primary':'#00A6FB',
          'secondary':"#F0F4EF",
          'accent':'#0582CA'

        },
        'gray':{
          '1':'#ACACAC',
          '2':'#C0C0C0',
          '3':'#D7D7D7',
          '4':'#EBEBEB',
          '5':'#FFFFFF',
          '6':'#343434',
          '7':'#252525',
          '8':'#1D1D1D',
          '9':'#151515',
          '10':'#000000',
        },
        'semantics':{
          '1':'#0ECE15',
          '2':'#CE0E0E',
          '3':'#CEC60E',
        }
      },
      backgroundColor:{
        'base':{
          'primary':'#00A6FB',
          'secondary':"#F0F4EF",
          'accent':'#0582CA'
        },
        'gray':{
          '1':'#ACACAC',
          '2':'#C0C0C0',
          '3':'#D7D7D7',
          '4':'#EBEBEB',
          '5':'#FFFFFF',
          '6':'#343434',
          '7':'#252525',
          '8':'#1D1D1D',
          '9':'#151515',
          '10':'#000000',
        },
        'semantics':{
          '1':'#0ECE15',
          '2':'#CE0E0E',
          '3':'#CEC60E',
        }
      },
      borderColor:{
        'base':{
          'primary':'#00A6FB',
          'secondary':"#F0F4EF",
          'accent':'#0582CA'
        },
        'gray':{
          '1':'#ACACAC',
          '2':'#C0C0C0',
          '3':'#D7D7D7',
          '4':'#EBEBEB',
          '5':'#FFFFFF',
          '6':'#343434',
          '7':'#252525',
          '8':'#1D1D1D',
          '9':'#151515',
          '10':'#000000',
        },
        'semantics':{
          '1':'#0ECE15',
          '2':'#CE0E0E',
          '3':'#CEC60E',
        }
      },
    },
  },
  plugins: [],
});