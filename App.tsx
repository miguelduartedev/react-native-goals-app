import { useState } from "react"
import { Button, FlatList, StyleSheet, View } from "react-native"
import GoalItem from "./components/GoalItem"
import GoalInput from "./components/GoalInput"
import { StatusBar } from "expo-status-bar"

const App = () => {
  const [courseGoals, setCourseGoals] = useState([])
  const [modalIsVisible, setModalIsVisible] = useState(false)

  const openModal = () => {
    setModalIsVisible(true)
  }

  const closeModal = () => {
    setModalIsVisible(false)
  }

  const addGoalHandler = (enteredGoal: string) => {
    setCourseGoals((prevState) => [
      ...prevState,
      { text: enteredGoal, id: Math.random().toString() },
    ])
    closeModal()
  }

  const deleteGoalHandler = (id) => {
    setCourseGoals((prevState) => prevState.filter((item) => item.id !== id))
  }

  return (
    <>
      <StatusBar style="light" />
      <View style={styles.appContainer}>
        <Button title="Add New Goal" color={"#b180f0"} onPress={openModal} />
        <GoalInput
          onAddGoal={addGoalHandler}
          onClose={closeModal}
          visibility={modalIsVisible}
        />
        <View style={styles.goalsContainer}>
          <FlatList
            data={courseGoals}
            renderItem={(itemData: any) => {
              return (
                <GoalItem
                  id={itemData.item.id}
                  itemData={itemData.item.text}
                  onDeleteItem={deleteGoalHandler}
                />
              )
            }}
            alwaysBounceVertical={false}
          />
        </View>
      </View>
    </>
  )
}

const styles = StyleSheet.create({
  appContainer: {
    paddingTop: 60,
    paddingHorizontal: 16,
    flex: 1, // Takes all the height
  },

  goalsContainer: {
    flex: 5, // Uses 5/6 of the Screen
  },
})

export default App
