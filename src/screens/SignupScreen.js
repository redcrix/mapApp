import React from 'react';
import {
  StyleSheet,
  TouchableOpacity,
  Text,
  View,
  ImageBackground,
  SafeAreaView,
  TextInput,
} from 'react-native';
import {bindActionCreators} from 'redux';
import * as reduxActions from '../redux/actions/actions';
import {connect} from 'react-redux';
import Loader from '../components/Loader';
import Toast from 'react-native-easy-toast';

const styles = StyleSheet.create({
    SubmitButtonStyle: {
        marginTop: 10,
        paddingVertical: 12,
        paddingHorizontal: 60, 
        backgroundColor: '#000',
        borderWidth: 1,
        borderRadius: 25,
        marginBottom: 10,
    },
    TextStyle: {
        color: '#fff',
        textAlign: 'center',
        fontSize: 18,
    },
    inputLbl: {
        fontSize: 16,
        width: '100%',
        color: '#fff',
        paddingLeft: 2,
        marginTop: 5,
        marginBottom: -12,
    },
    inputTxt: {
        fontSize: 16,
        width: '100%',
        color: '#fff',
        borderBottomColor: '#ADD8E6',
        borderBottomWidth: 0.5,
    }
})


class SignupScreen extends React.Component {
    state = {
        password: "",
        username: "",
        country: "",
        email: "",
        profileImage: "",
    };

    constructor(props) {
        super(props);
        console.log(props.reduxState.userdata);
    }
  
    ButtonClickCheckFunction = () => {
        this.props.reduxActions.signup(
            this.props.navigation,
            this.refs.toast,
            {
                username: this.state.username,
                password: this.state.password,
                country: this.state.country,
                email: this.state.email,
                profile_pick: this.state.profileImage,
                device_token: "XXXX",
                device_os: "XX",
            },
        );
    }

    render() {
        return (
            <SafeAreaView style={{
                flex: 1,
                color: '#fff',
            }}>
                <ImageBackground source={require("../../assets/images/loginScreen.png")}
                    style={{
                        width: '100%',
                        height: '100%'
                    }}
                >
                    <View
                        style={{
                            flex: 1,
                            justifyContent: 'center',
                        }}>
                        <View
                            style={{
                                paddingLeft: 25,
                                paddingBottom: 20,
                                // marginTop: 0,
                            }}
                        >
                            <Text
                                style={{
                                    fontSize: 25,
                                    width: '100%',
                                    color: '#fff',
                                }}>
                                Sign Up
                            </Text>
                            <View
                                style={{
                                    paddingTop: 5,
                                    width: 30,
                                    borderBottomColor: '#fff',
                                    borderBottomWidth: 2,
                                }}
                            />
                        </View>
                        <View
                            style={{
                                width: '100%',
                                paddingHorizontal: 25,
                            }}>
                            <Text style={styles.inputLbl} >
                                Username
                            </Text>
                            <TextInput
                                style={styles.inputTxt}
                                underlineColorAndroid = "transparent"
                                autoCapitalize="none"
                                type="text"
                                onChangeText={username => this.setState({ username })} />
                            <Text style={styles.inputLbl}>
                                Password
                            </Text>
                            <TextInput
                                style={styles.inputTxt}
                                secureTextEntry={true}
                                underlineColorAndroid = "transparent"
                                autoCapitalize="none"
                                onChangeText={ password => this.setState({ password })} />
                            <Text style={styles.inputLbl} >
                                Country
                            </Text>
                            <TextInput
                                style={styles.inputTxt}
                                underlineColorAndroid = "transparent"
                                autoCapitalize="none"
                                type="text"
                                onChangeText={country => this.setState({ country })} />
                            <Text style={styles.inputLbl}>
                                Email
                            </Text>
                            <TextInput
                                style={styles.inputTxt}
                                underlineColorAndroid = "transparent"
                                autoCapitalize="none"
                                type="email"
                                onChangeText={email => this.setState({ email })} />
                            <Text style={styles.inputLbl}>
                                Profile Pick
                            </Text>
                            <TextInput
                                style={styles.inputTxt}
                                underlineColorAndroid = "transparent"
                                autoCapitalize="none"
                                type="text"
                                onChangeText={profileImage => this.setState({ profileImage })} />
                        </View>
                        <View
                            style={{
                                flexDirection: 'row',
                                width: '100%',
                                justifyContent: 'center',
                                marginTop: 10,
                            }}>
                            <TouchableOpacity
                                style={styles.SubmitButtonStyle}
                                activeOpacity = {.7}
                                onPress={ this.ButtonClickCheckFunction }
                            >
                                <Text style={styles.TextStyle}> SIGNUP </Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                    <TouchableOpacity
                        activeOpacity={.7}
                        onPress={() => this.props.navigation.navigate('LoginScreen')}
                    >
                        <Text
                            style={{
                                fontSize: 16,
                                width: '100%',
                                color: '#a9b8c3',
                                marginTop: 5,
                                textAlign: 'center',
                                paddingBottom: 20,
                            }}
                        >
                            Already have an account? 
                            <Text style={{
                                    color: '#000',
                                }}
                            > LOGIN</Text> 
                        </Text>
                    </TouchableOpacity>
                </ImageBackground>
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
            </SafeAreaView>
        );
    }
}
const mapStateToProps = state => ({
  reduxState: state.reducers,
});

const mapDispatchToProps = dispatch => ({
  reduxActions: bindActionCreators(reduxActions, dispatch),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(SignupScreen);
