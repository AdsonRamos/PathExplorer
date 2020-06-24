import { createStackNavigator } from 'react-navigation-stack'
import { createAppContainer } from 'react-navigation'
import Home from '../../view/screens/home';
import ReviewDetails from '../../view/screens/reviewDetails';
import AStar from '../../view/screens/aStar/aStarScreen'
import AStarPreScreen from '../../view/screens/aStar/aStarPreScreen'
import BFS from '../../view/screens/bfs/bfsScreen'

const screens = {
    BFS: {
        screen: BFS
    },
    AStar: {
        screen: AStar,
        navigationOptions: {
            title: 'A*',
        }
    },
    AStarPreScreen: {
        screen: AStarPreScreen,
        navigationOptions: {
            title: 'A*',
        }
    },
    Home: {
        screen: Home
    },
    ReviewDetails: {
        screen: ReviewDetails
    },

}

const HomeStack = createStackNavigator(screens, {
    defaultNavigationOptions: {
        headerTintColor: '#252422',
        headerStyle: { backgroundColor: '#EEE', height: 60 }
    }
})

export default createAppContainer(HomeStack)
