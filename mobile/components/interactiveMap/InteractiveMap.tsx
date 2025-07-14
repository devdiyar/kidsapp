import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  View,
  Dimensions,
  TouchableOpacity,
  Image,
  Text,
} from "react-native";
import MapView, { Marker } from "react-native-maps";
import * as Location from "expo-location";

const InteractiveMap = () => {
  const [region, setRegion] = useState({
    latitude: 51.549999,
    longitude: 7.216667,
    latitudeDelta: 0.05,
    longitudeDelta: 0.05,
  });
  const [location, setLocation] = useState<Location.LocationObject | null>(
    null
  );

  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        console.log("Permission to access location was denied");
        return;
      }

      let userLocation = await Location.getCurrentPositionAsync({});
      setLocation(userLocation);
      setRegion({
        latitude: userLocation.coords.latitude,
        longitude: userLocation.coords.longitude,
        latitudeDelta: 0.05,
        longitudeDelta: 0.05,
      });
    })();
  }, []);

  const zoomIn = () => {
    setRegion((prevRegion) => ({
      ...prevRegion,
      latitudeDelta: prevRegion.latitudeDelta / 2,
      longitudeDelta: prevRegion.longitudeDelta / 2,
    }));
  };

  const zoomOut = () => {
    setRegion((prevRegion) => ({
      ...prevRegion,
      latitudeDelta: prevRegion.latitudeDelta * 2,
      longitudeDelta: prevRegion.longitudeDelta * 2,
    }));
  };

  return (
    <View style={styles.container}>
      <MapView
        style={styles.map}
        region={region}
        onRegionChangeComplete={(newRegion) => setRegion(newRegion)}
        showsUserLocation={false}
      >
        {location && (
          <Marker
            coordinate={{
              latitude: location.coords.latitude,
              longitude: location.coords.longitude,
            }}
          >
            <View style={styles.userLocationMarker} />
          </Marker>
        )}

        <Marker
          coordinate={{ latitude: 51.5366, longitude: 7.2006 }}
          title={"Veranstaltung 1"}
        >
          <View style={styles.veranstaltungMarker}>
            <Image
              source={require("@/assets/images/icons/activityMap/trend.png")}
              style={styles.trendIcon}
            />
            <Text style={styles.veranstaltungText}>8</Text>
          </View>
        </Marker>
        <Marker
          coordinate={{ latitude: 51.5356, longitude: 7.2056 }}
          title={"Veranstaltung 2"}
        >
          <View style={styles.veranstaltungMarker}>
            <Text style={styles.veranstaltungText}>3</Text>
          </View>
        </Marker>
        <Marker
          coordinate={{ latitude: 51.5376, longitude: 7.2106 }}
          title={"Veranstaltung 3"}
        >
          <View style={styles.veranstaltungMarker}>
            <Text style={styles.veranstaltungText}>5</Text>
          </View>
        </Marker>

        <Marker
          coordinate={{ latitude: 51.5396, longitude: 7.2156 }}
          title={"Veranstaltung 4"}
        >
          <View style={styles.veranstaltungMarker}>
            <Image
              source={require("@/assets/images/testimages/actvity1.png")}
              style={styles.veranstaltungImage}
            />
            <Image
              source={require("@/assets/images/icons/activityMap/trend.png")}
              style={styles.trendIcon}
            />
            <View style={styles.veranstaltungMarkerTriangle} />
          </View>
        </Marker>

        <Marker
          coordinate={{ latitude: 51.5386, longitude: 7.2206 }}
          title={"Veranstaltung 5"}
        >
          <View style={styles.veranstaltungMarker}>
            <Image
              source={require("@/assets/images/testimages/actvity2.png")}
              style={styles.veranstaltungImage}
            />
            <Image
              source={require("@/assets/images/icons/activityMap/trend.png")}
              style={styles.trendIcon}
            />
            <View style={styles.veranstaltungMarkerTriangle} />
          </View>
        </Marker>

        <Marker
          coordinate={{ latitude: 51.5406, longitude: 7.2256 }}
          title={"Veranstaltung 6"}
        >
          <View style={styles.veranstaltungMarker}>
            <Image
              source={require("@/assets/images/testimages/actvity3.png")}
              style={styles.veranstaltungImage}
            />
            <Image
              source={require("@/assets/images/icons/activityMap/trend.png")}
            />
            <View style={styles.veranstaltungMarkerTriangle} />
          </View>
        </Marker>

        <Marker
          coordinate={{ latitude: 51.5416, longitude: 7.2306 }}
          title={"Veranstaltung 7"}
        >
          <View style={styles.veranstaltungMarker}>
            <Image
              source={require("@/assets/images/testimages/actvity4.png")}
              style={styles.veranstaltungImage}
            />
            <Image
              source={require("@/assets/images/icons/activityMap/trend.png")}
            />
            <View style={styles.veranstaltungMarkerTriangle} />
          </View>
        </Marker>
      </MapView>

      <TouchableOpacity style={[styles.button, styles.zoomIn]} onPress={zoomIn}>
        <Image
          source={require("@/assets/images/icons/activityMap/zoomin.png")}
          style={styles.icon}
        />
      </TouchableOpacity>

      <TouchableOpacity
        style={[styles.button, styles.zoomOut]}
        onPress={zoomOut}
      >
        <Image
          source={require("@/assets/images/icons/activityMap/zoomout.png")}
          style={styles.icon}
        />
      </TouchableOpacity>

      <TouchableOpacity
        style={[
          styles.button,
          styles.myLocation,
          { backgroundColor: "#fd573b", marginTop: 100 },
        ]}
        onPress={() => {
          if (location) {
            setRegion({
              latitude: location.coords.latitude,
              longitude: location.coords.longitude,
              latitudeDelta: 0.05,
              longitudeDelta: 0.05,
            });
          }
        }}
      >
        <Image
          source={require("@/assets/images/icons/activityMap/myLocation.png")}
          style={styles.icon}
        />
      </TouchableOpacity>
    </View>
  );
};

export default InteractiveMap;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  map: {
    width: Dimensions.get("window").width,
    height: Dimensions.get("window").height,
  },
  button: {
    position: "absolute",
    backgroundColor: "white",
    borderRadius: 10,
    padding: 15,
    elevation: 5,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    zIndex: 10,
  },
  zoomIn: {
    top: Dimensions.get("window").height * 0.4,
    right: 20,
  },
  zoomOut: {
    top: Dimensions.get("window").height * 0.5,
    right: 20,
  },
  myLocation: {
    top: Dimensions.get("window").height * 0.6,
    right: 20,
  },
  icon: {
    width: 30,
    height: 30,
  },
  userLocationMarker: {
    width: 30,
    height: 30,
    borderRadius: 50,
    backgroundColor: "#fd573b",
    borderWidth: 5,
    borderColor: "white",
  },
  veranstaltungMarker: {
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "white",
    width: 50,
    height: 50,
    borderRadius: 25,
    borderWidth: 2,
    borderColor: "#f5f5f5",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    position: "relative",
  },
  veranstaltungMarkerTriangle: {
    position: "absolute",
    bottom: -10,
    width: 0,
    height: 0,
    borderLeftWidth: 10,
    borderRightWidth: 10,
    borderTopWidth: 10,
    borderLeftColor: "transparent",
    borderRightColor: "transparent",
    borderTopColor: "white",
  },
  trendIcon: {
    position: "absolute",
    top: -10,
    right: -10,
    width: 20,
    height: 20,
    backgroundColor: "#fd573b",
    borderRadius: 10,
    padding: 3,
  },
  veranstaltungText: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#333",
  },
  veranstaltungImage: {
    width: 40,
    height: 40,
    borderRadius: 20,
  },
});
