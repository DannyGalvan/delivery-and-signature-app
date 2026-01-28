import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { TouchableButton } from '@components/button/TouchableButton';
import { useAuth } from '@hooks/useAuth';
import { appColors } from '@styles/appColors';
import { InputForm } from '@components/input/InputForm';
import { appStyles } from '@styles/appStyles';
import { Logo } from '@components/Icons/Logo';
import { ErrorObject, useForm } from '@hooks/useForm';
import { LoginRequest } from '@app-types/auth/LoginRequest';
import { authShema } from '@validations/AuthValidations';
import { handleOneLevelZodError } from '@utils/converted';
import { LoginResponse } from '@app-types/auth/LoginResponse';
import { loginService } from '@services/authService';
import { useErrorsStore } from '@stores/useErrorsStore';
import { ResponseMessage } from '@components/pure/ResponseMessage';
import { NavigationProp, useNavigation } from '@react-navigation/native';
import { AuthParamList } from '@app-types/navigators/IAuthNavigator';
import { ScrollView } from 'react-native-gesture-handler';
import { Title } from '@components/pure/Title';

const initialLogin: LoginRequest = {
  userName: '',
  password: '',
};

const loginValidations = (form: LoginRequest) => {
  let errors: ErrorObject = {};

  const parce = authShema.safeParse(form);

  if (!parce.success) errors = handleOneLevelZodError(parce.error);

  return errors;
};

export const LoginScreen = () => {
  const { signIn } = useAuth();
  const { resetError, error } = useErrorsStore();
  const { navigate } = useNavigation<NavigationProp<AuthParamList>>();

  const handleLogin = async (form: LoginRequest) => {
    resetError();

    const response = await loginService(form);

    if (!response.success) return response;

    const authResponse: LoginResponse = response.data as LoginResponse;

    signIn({
      username: authResponse.name,
      token: authResponse.token,
      idUser: authResponse.userId,
      employeeCode: authResponse.employeeCode,
      companyCode: authResponse.companyCode,
      rol: authResponse.rol,
      operations: authResponse.operations,
    });

    return response;
  };

  const {
    form,
    handleChange,
    handleSubmit,
    errors,
    loading,
    message,
    success,
  } = useForm<LoginRequest, LoginResponse>(
    initialLogin,
    loginValidations,
    handleLogin,
    true,
  );

  return (
    <ScrollView contentContainerStyle={styles.screen}>
      <Title text="Iniciar Sesion" />

      <View style={styles.containerLogo}>
        <Logo isVisible={false} style={styles.logo} />
      </View>

      <InputForm
        containerStyles={styles.input}
        name="userName"
        errorMessage={errors?.userName}
        colorText={appStyles.textDark}
        placeholderTextColor={appColors.gray}
        colorInput={appStyles.inputLight}
        label="Usuario"
        value={form.userName}
        onChangeText={(text: string) => handleChange('userName', text)}
        placeholder="Ingrese su nombre de usuario"
        icon="people-circle"
        iconColor={appColors.sky}
        secureTextEntry={false}
      />

      <InputForm
        containerStyles={styles.input}
        name="password"
        errorMessage={errors?.password}
        colorText={appStyles.textDark}
        placeholderTextColor={appColors.gray}
        colorInput={appStyles.inputLight}
        label="Contraseña"
        value={form.password}
        onChangeText={(text: string) => handleChange('password', text)}
        placeholder="Ingrese su contraseña"
        secureTextEntry={true}
        icon="eye"
        iconColor={appColors.sky}
      />

      <TouchableButton
        styles={styles.button}
        textClassName="text-lg text-white font-bold"
        onPress={handleSubmit}
        title="Iniciar sesión"
        icon="log-in"
      />

      <Text
        className="text-center text-sky-500 text-lg underline my-2"
        onPress={() => navigate('RecoveryPassword')}
      >
        Olvido su Contraseña?
      </Text>

      <ResponseMessage message={message} success={success} loading={loading} />

      <ResponseMessage
        message={
          error &&
          `Error: ${error?.message}, code: ${error?.statusCode}, name: ${error?.name}`
        }
        success={false}
        loading={false}
      />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  button: {
    backgroundColor: appColors.warning,
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
  },
  input: {
    width: '80%',
    marginVertical: 10,
  },
  containerLogo: {
    margin: 20,
  },
  logo: {
    width: 150,
    height: 150,
  },
});
