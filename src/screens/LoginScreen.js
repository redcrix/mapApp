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
        paddingHorizontal: 40, 
        backgroundColor: '#000',
        borderWidth: 1,
        borderRadius: 25,
        marginBottom: 10,
    },
    RegisterButtonStyle: {
        marginTop: 10,
        paddingVertical: 12,
        paddingHorizontal: 30,
        backgroundColor: '#fff',
        borderColor: '#d3d3d3',
        borderWidth: 1,
        borderRadius: 25,
        marginBottom: 10,
        marginRight: 15,
    },
    TextStyle: {
        color: '#fff',
        textAlign: 'center',
        fontSize: 18,
    },
    RegisterTextStyle: {
        color: '#666',
        textAlign: 'center',
        fontSize: 18,
    },
})


class LoginScreen extends React.Component {
    state = {
        userName: "redcrix1",
        password: "infantry",
    };

    constructor(props) {
        super(props);
        console.log(props.reduxState.userdata);
        if (props.reduxState.userdata && Object.keys(props.reduxState.userdata).length > 0) {
            props.navigation.navigate('HomeScreen');
        }
    }
  
    ButtonClickCheckFunction = () => {
        this.props.reduxActions.login(
            this.props.navigation,
            this.refs.toast,
            this.state.userName,
            this.state.password,
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
                                marginTop: 50,
                            }}
                        >
                            <Text
                                style={{
                                    fontSize: 25,
                                    width: '100%',
                                    color: '#fff',
                                }}>
                                Login
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
                                padding: 25,
                            }}>
                            <Text
                                style={{
                                    fontSize: 16,
                                    width: '100%',
                                    color: '#fff',
                                    paddingLeft: 2,
                                    marginBottom: -10,
                                }}>
                                Email
                            </Text>
                            <TextInput
                                style={{
                                    fontSize: 16,
                                    width: '100%',
                                    color: '#fff',
                                    borderBottomColor: '#ADD8E6',
                                    borderBottomWidth: 0.5,
                                }}
                                underlineColorAndroid = "transparent"
                                autoCapitalize="none"
                                type="email"
                                value="redcrix1"
                                onChangeText={userName => this.setState({ userName })} />
                            <Text
                                style={{
                                    fontSize: 16,
                                    width: '100%',
                                    color: '#fff',
                                    paddingLeft: 2,
                                    marginTop: 20,
                                    marginBottom: -10,
                                }}>
                                Password
                            </Text>
                            <TextInput
                                style={{
                                    fontSize: 16,
                                    width: '100%',
                                    color: '#fff',
                                    borderBottomColor: '#ADD8E6',
                                    borderBottomWidth: 0.5,
                                }}
                                secureTextEntry={true}
                                underlineColorAndroid = "transparent"
                                autoCapitalize="none"
                                value="infantry"
                                onChangeText={ password => this.setState({ password })} />
                            <Text
                                style={{
                                    fontSize: 12,
                                    width: '100%',
                                    color: '#fff',
                                    marginTop: 5,
                                    textAlign: 'right',
                                }}>
                                Forgot Password?
                            </Text>
                        </View>
                        <View
                            style={{
                                flexDirection: 'row',
                                width: '100%',
                                justifyContent: 'center',
                                marginTop: 10,
                            }}>
                            <TouchableOpacity
                                style={styles.RegisterButtonStyle}
                                activeOpacity = {.7}
                                onPress={() => this.props.navigation.navigate('SignupScreen')}
                            >
                                <Text style={styles.RegisterTextStyle}> SIGNUP </Text>
                            </TouchableOpacity>
                            <TouchableOpacity
                                style={styles.SubmitButtonStyle}
                                activeOpacity = {.7}
                                onPress={ this.ButtonClickCheckFunction }
                            >
                                <Text style={styles.TextStyle}> LOGIN </Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                    <Text
                        style={{
                            fontSize: 16,
                            width: '100%',
                            color: '#a9b8c3',
                            marginTop: 5,
                            textAlign: 'center',
                            paddingBottom: 20,
                        }}>
                        Don't have an account?
                        <Text
                            
                            style={{
                                color: '#000',
                            }}
                        > SIGN UP</Text> 
                    </Text>
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
)(LoginScreen);
