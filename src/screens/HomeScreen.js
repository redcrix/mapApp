import React from 'react';
import {
  StyleSheet,
  TouchableOpacity,
  Text,
  View,
  Button,
  SafeAreaView,
  Image,
  TextInput,
} from 'react-native';
import {bindActionCreators} from 'redux';
import * as reduxActions from '../redux/actions/actions';
import {connect} from 'react-redux';
import MapView from 'react-native-maps';
import {GiftedChat} from 'react-native-gifted-chat';
import {
  Menu,
  Divider,
  Provider,
} from 'react-native-paper';

import {Marker} from 'react-native-maps';
import randomLocation from 'random-location';
import Modal from 'react-native-modal';
import Toast from 'react-native-easy-toast';
import Loader from '../components/Loader';
import Geolocation from '@react-native-community/geolocation';

class HomeScreen extends React.Component {
  state = {
    Name: '',
    visible: false,
    isModalVisible: false,
    isModalVisiblePost: false,
    messages: [],
    User: {
      id: '',
      name: '',
      text: '',
      createdAt: new Date(),
    },
    lastLat: 25.579663,
    lastLong: 77.321111,
    postMessage: '',
  };

  _openMenu = () => this.setState({visible: true});

  _closeMenu = () => this.setState({visible: false});

  toggleModal = () => {
    this.setState({isModalVisible: !this.state.isModalVisible});
  };

  sendPost = () => {
    console.log('______', this.state.postMessage);
    const {userdata} = this.props.reduxState;
    Geolocation.getCurrentPosition(info => {
      this.setState({
        isModalVisiblePost: false
      });
      this.setState({
        lastLat: info.coords.latitude,
        lastLong: info.coords.longitude,
      });
      const sendPost = {
        message: this.state.postMessage,
        lat: info.coords.latitude,
        long: info.coords.longitude,
        user_token: userdata.user_token,
        username: userdata.user,
        user_id: userdata.user_id,
        type: 'pin',
      };
      this.props.reduxActions.addNewPinPoint(
        this.refs.toast,
        sendPost,
        () => this.props.reduxActions.getAllPinPoints({
          lat: info.coords.latitude,
          long: info.coords.longitude,
        })
      );
      console.log("======", sendPost);
    });
  }

  toggleModalPost = () => {
    this.setState({ isModalVisiblePost: !this.state.isModalVisiblePost });
  };

  getPinPoint = () => {
    console.log("getPinPoint___________");
    this.props.reduxActions.getAllPinPoints({
      lat: this.state.lastLat,
      long: this.state.lastLong,
    });
  };

  componentDidMount() {
    Geolocation.getCurrentPosition(info => {
      this.setState({
        lastLat: info.coords.latitude,
        lastLong: info.coords.longitude,
      });
      this.getPinPoint();
    });
    // this.props.reduxActions.addNewPinPoint
  }

  onRegionChange(lastLat, lastLong) {
    this.setState({
      lastLat: lastLat || this.state.lastLat,
      lastLong: lastLong || this.state.lastLong,
    });
  }

  UNSAFE_componentWillMount() {
    this.setState({
      messages: [
        {
          _id: 1,
          text:
            'This is a quick reply. Do you love Gifted Chat? (radio) KEEP IT',
          createdAt: new Date(),

          user: {
            _id: 2,
            name: 'VK',
          },
          coords: {
            latitude: 25.579663,
            longitude: 77.321111,
          },
        },
        {
          _id: 2,
          text: 'This is a quick reply. Do you love Gifted Chat? (checkbox)',
          createdAt: new Date(),
          user: {
            _id: 2,
            name: 'Aman Khurana',
          },
          coords: {
            latitude: 25.579663,
            longitude: 78.321111,
          },
        },
      ],
    });
  }

  onSend(messages = []) {
    const P = {
      latitude: 25.579663,
      longitude: 77.321111,
    };

    const R = 30000; // meters
    const randomPoint = randomLocation.randomCircumferencePoint(P, R);
    messages.sort().reverse();
    const id = messages.forEach(pcs => {
      const messagess = [
        {
          _id: pcs._id,
          text: pcs.text,
          createdAt: new Date(),

          user: {
            _id: pcs._id,
            name: this.state.Name,
          },
          coords: {
            latitude: randomPoint.latitude,
            longitude: randomPoint.longitude,
          },
        },
      ];

      console.log('messages =======', messagess);
      this.setState(previousState => ({
        messages: GiftedChat.append(previousState.messages, messagess),
      }));
    });
  }

  onhandle = () => {
    const manoj = [
      {
        _id: 3,
        text: 'Where are you busy',
        createdAt: new Date(),

        user: {
          _id: 3,
          name: 'Sona',
        },
      },
    ];
    var joined = this.state.messages.concat(manoj).reverse();
    this.setState({messages: joined});
  };

  getInfo = (id, name, text, createdAt) => {
    console.log('user : ', id, name, text, createdAt);
    this.toggleModal();
    this.setState({
      User: {id: id, name: name, text: text, createdAt: createdAt},
    });
  };
  render() {
    const {messages} = this.state;
    console.log('R_________', this.props.reduxState.pinPoint);
    return (
      <View style={styles.MainContainer}>
        <MapView
          style={styles.mapStyle}
          showsUserLocation={true}
          zoomEnabled={true}
          region={{
            latitude: this.state.lastLat,
            longitude: this.state.lastLong,
            latitudeDelta: 2.579663,
            longitudeDelta: 4.321111,
          }}>
          {
            this.props.reduxState.pinPoint.map(user => {
              if (!(user.lat && user.long)) {
                return null;
              }
              return (
                <Marker
                  key={user._id}
                  coordinate={{
                    latitude: parseFloat(user.lat),
                    longitude: parseFloat(user.long),
                  }}
                  title={'Name : ' + user.userName}
                  // description={user.text}
                  onPress={() =>
                    this.getInfo(
                      user._id,
                      user.userName,
                      user.message,
                      user.createdAt,
                    )
                  }
                />
              );
            })
          }
          {/* {messages.map(user => (
            <Marker
              key={user._id}
              coordinate={{
                latitude: parseFloat(user.coords.latitude),
                longitude: parseFloat(user.coords.longitude),
              }}
              title={'Name : ' + user.user.name}
              // description={user.text}
              onPress={() =>
                this.getInfo(
                  user._id,
                  user.user.name,
                  user.text,
                  user.createdAt,
                )
              }>
              <Image source={require('./image/manoj.jpg')} style={{ height: 50, width: 50, borderRadius: 25, borderColor: "red", borderWidth: 4 }} />
            </Marker>
          ))} */}
        </MapView>

        <Modal isVisible={this.state.isModalVisible}>
          <View style={{height: 500, backgroundColor: '#fff'}}>
            <Text style={{fontSize: 25, alignSelf: 'center'}}>
              {'Name : ' + this.state.User.name}
            </Text>
            <GiftedChat
              messages={this.state.messages}
              onSend={messages => this.onSend(messages)}
              user={{
                _id: 1,
                name: 'Me!!',
              }}
            />
            <Button title="Close" onPress={this.toggleModal} />
          </View>
        </Modal>

        {/* Menu react-paper-menu */}
        <View>
          <Provider>
            <View
              style={{
                marginTop: 'auto',
                flexDirection: 'row',
                justifyContent: 'center',
                alignSelf: 'center',
              }}>
              <Menu
                style={{
                  marginTop: -120,
                  marginLeft: -100,
                  height: 200,
                  width: 200,
                }}
                visible={this.state.visible}
                onDismiss={this._closeMenu}
                anchor={
                  <SafeAreaView>
                    <View
                      style={{
                        flexDirection: 'row',
                        flexWrap: 'wrap-reverse',
                        marginBottom: 15,
                      }}>
                      <TouchableOpacity
                        style={{
                          marginRight: 20,
                        }}
                        onPress={() => this.toggleModalPost()}>
                        <View
                          style={{
                            backgroundColor: 'white',
                            borderRadius: 80,
                            padding: 20,
                          }}>
                          <Image
                            source={require('../../assets/images/plus.png')}
                            style={{
                              height: 30,
                              width: 30,
                            }}
                          />
                        </View>
                      </TouchableOpacity>
                      <TouchableOpacity onPress={() => this._openMenu()}>
                        <View
                          style={{
                            backgroundColor: 'white',
                            borderRadius: 80,
                            padding: 20,
                          }}>
                          <Image
                            source={require('../../assets/images/more.png')}
                            style={{
                              height: 30,
                              width: 30,
                            }}
                          />
                        </View>
                      </TouchableOpacity>
                    </View>
                  </SafeAreaView>
                }>
                <View>
                  <Menu.Item onPress={() => {}} title="Find Me" />
                  <Divider />
                  <Menu.Item onPress={() => {}} title="Ride Me" />
                  <Divider />
                  <Menu.Item onPress={() => {}} title="Ride With Me" />
                  <Divider />
                  <Menu.Item onPress={() => {}} title="Help Me" />
                </View>
              </Menu>
            </View>
            <View />
          </Provider>
        </View>

        <Modal isVisible={this.state.isModalVisiblePost}>
          <View
            style={{
              height: 270,
              backgroundColor: '#fff',
              borderRadius: 50,
              padding: 20,
              margin: 20,
            }}>
            <TouchableOpacity
              onPress={() => this.setState({isModalVisiblePost: false})}>
              <Text
                style={{
                  fontSize: 20,
                  textAlign: 'right',
                  paddingRight: 10,
                  color: 'darkgray',
                }}>
                x
              </Text>
              <TextInput
                style={{
                  height: 120,
                  backgroundColor: 'lightgray',
                  marginVertical: 20,
                  marginHorizontal: 5,
                  borderRadius: 25,
                  padding: 15,
                }}
                onChangeText={postMessage => this.setState({postMessage})}
                placeholder="Add your Chat"
                multiline
              />
            </TouchableOpacity>
            <TouchableOpacity onPress={this.sendPost}>
              <Text
                style={{
                  fontSize: 20,
                  textAlign: 'center',
                  backgroundColor: '#5457CE',
                  color: 'white',
                  borderRadius: 10,
                  lineHeight: 40,
                  marginTop: 5,
                  marginHorizontal: 45,
                  fontWeight: 'bold',
                }}>
                Post
              </Text>
            </TouchableOpacity>
          </View>
        </Modal>
        <Toast
            ref="toast"
            style={{
                backgroundColor: 'black',
                justifyContent: 'center',
                width: '90%',
            }}
            position="bottom"
            positionValue={130}
            fadeInDuration={750}
            fadeOutDuration={2000}
            opacity={0.8}
            textStyle={{
                color: 'white',
                textAlign: 'center',
                fontSize: 18,
                fontWeight: 'bold',
            }}
        />
        {
          this.props.reduxState.loading
          && <Loader />
        }
      </View>
    );
  }
}

const styles = StyleSheet.create({
  MainContainer: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    alignItems: 'center',
    justifyContent: 'flex-end',
  },
  mapStyle: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
}); 

const mapStateToProps = (state) => ({
  reduxState: state.reducers,
});

const mapDispatchToProps = (dispatch) => ({
  reduxActions: bindActionCreators(reduxActions, dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(HomeScreen);
