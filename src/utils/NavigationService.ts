/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react-hooks/rules-of-hooks */
import {
    StackActions,
    CommonActions,
    DrawerActions,
    TabActions,
  } from '@react-navigation/native';
  import React from 'react';
  
  export const navigationRef: any = React.createRef();
  
  function navigate(routeName: any, params?: any, stackName?: any) {
    if (stackName) {
      navigationRef.current.navigate(stackName, { screen: routeName, params });
    } else {
      navigationRef.current.navigate(routeName, params);
    }
  }
  
  function replace(routeName: any, params: any) {
    navigationRef.current.dispatch(StackActions.replace(routeName, params));
  }
  
  function push(routeName: any, params: any) {
    navigationRef.current.dispatch(StackActions.push(routeName, params));
  }
  
  function pop(number: any) {
    navigationRef.current.dispatch(StackActions.pop(number));
  }
  
  function popToTop() {
    navigationRef.current.dispatch(StackActions.popToTop());
  }
  
  function getNavigator() {
    return navigationRef.current;
  }
  
  function reset(name: any, params?: any) {
    const resetAction = CommonActions.reset({
      index: 0,
      routes: [{ name, params }],
    });
    navigationRef.current.dispatch(resetAction);
  }
  
  function jumpTo(routeName: any, params: any) {
    navigationRef.current.dispatch(TabActions.jumpTo(routeName, params));
  }
  
  function getCurrentRoute() {
    return getNavigator().getCurrentRoute();
  }
  
  function getCurrentRouteName() {
    return getNavigator().getCurrentRoute()?.name;
  }
  
  function goBack() {
    navigationRef.current.dispatch(CommonActions.goBack());
  }
  
  function closeDrawer() {
    navigationRef.current.dispatch(DrawerActions.closeDrawer());
  }
  
  function openDrawer() {
    navigationRef.current.dispatch(DrawerActions.openDrawer());
  }
  
  function hideHeader(navigation: any) {
    React.useLayoutEffect(() => {
      navigation.setOptions({ headerShown: false });
    }, []);
  }
  
  function setTitle(navigation: any, title: any, dependency = []) {
    React.useEffect(() => {
      navigation.setOptions({ title });
    }, dependency);
  }
  
  export default {
    navigationRef,
    replace,
    push,
    pop,
    jumpTo,
    getCurrentRoute,
    getNavigator,
    navigate,
    reset,
    popToTop,
    goBack,
    closeDrawer,
    openDrawer,
    hideHeader,
    setTitle,
    getCurrentRouteName,
  };