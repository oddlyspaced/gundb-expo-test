import { View, Text } from "react-native";
import Gun from "gun";
import { useState, useEffect } from "react";

const gun = Gun({
  peers: ['http://srivalab-compute.cse.iitk.ac.in:5031/gun'] // Put the relay node that you want here
})

const Home = () => {
    const [txt, setTxt] = useState();

    useEffect(() => {
        gun.get('text').once((node) => {
            console.log(node)
            if (node === undefined) {
                gun.get('text').put({text: "Write some text here"});
            }
            else {
                console.log("Found node")
                setTxt(node.text);
            }
        })

        gun.get('text').on((node) => {
            console.log("Receiving update");
            console.log(node)
            setTxt(node.text)
        })
    }, []);
    return (
        <View>
            <Text>
                {txt}
            </Text>
        </View>
    )
}

export default Home;

// function App() {

//   const [txt, setTxt] = useState()

//   const updateText = (event) => {
//     console.log("Updating Text")
//     console.log(event.target.value)
//     gun.get('text').put({text: event.target.value}) // Edit the value in our db
//     setTxt(event.target.value)
//   }

//   return (
//     <div className="App">
//       <h1>Collaborative Document With GunJS</h1>
//       <textarea value = {txt} onChange = {updateText}/>
//     </div>
    
//   );
// }