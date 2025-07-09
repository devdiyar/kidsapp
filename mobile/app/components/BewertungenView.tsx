import React from 'react';
import { View, Text, StyleSheet, FlatList, Image } from 'react-native';
//Nur Testdaten 
export const Bewertungen_Beispiel_Data = [
	{
		Name: 'Kevin Mayer',
		Profilbild: require('../../assets/images/testimages/Beispielprofilbild.jpeg'),
		Sterne: 4,
		Text: 'Informativ und unterhaltsam, aber die Verpflegung könnte besser sein. Ansonsten top!',
	},
	{
		Name: 'Elisabeth Fischer',
		Profilbild: require('../../assets/images/testimages/Beispielprofilbild.jpeg'),
		Sterne: 5,
		Text: 'Einfach großartig! Die Veranstaltung war perfekt organisiert und hat viel Spaß gemacht. Sehr empfehlenswert!',
	},
	{
		Name: 'Max Müller',
		Profilbild: require('../../assets/images/testimages/Beispielprofilbild.jpeg'),
		Sterne: 1,
		Text: 'Die Veranstaltung war enttäuschend. Zu wenig Informationen und die Organisation ließ zu wünschen übrig.',
	},
	{
		Name: 'Sophie Schmitt',
		Profilbild: require('../../assets/images/testimages/Beispielprofilbild.jpeg'),
		Sterne: 3,
		Text: 'Ganz okay, aber es gab organisatorische Probleme. Die Location war aber schön.',
	},
	{
		Name: 'Jonas Becker',
		Profilbild: require('../../assets/images/testimages/Beispielprofilbild.jpeg'),
		Sterne: 5,
		Text: 'Super Event! Tolle Atmosphäre und sehr nette Leute. Komme gerne wieder!',
	},
];

export function BewertungenView({
	visible,
	onClose,
}: {
	visible: boolean;
	onClose: () => void;
}) {
	if (!visible) return null;
	return (
		<View style={styles.overlay}>
			<View style={styles.containerSmall}>
				<Text style={styles.title}>Bewertungen</Text>
				<View style={styles.scrollArea}>
					<FlatList
						data={Bewertungen_Beispiel_Data}
						keyExtractor={(_, idx) => idx.toString()}
						renderItem={({ item }) => (
							<View style={styles.item}>
								<Image source={item.Profilbild} style={styles.avatar} />
								<View style={{ flex: 1 }}>
									<Text style={styles.name}>{item.Name}</Text>
									<Text style={styles.stars}>
										{'★'.repeat(item.Sterne)}
										{'☆'.repeat(5 - item.Sterne)}
									</Text>
									<Text style={styles.text}>{item.Text}</Text>
								</View>
							</View>
						)}
						showsVerticalScrollIndicator={true}
					/>
				</View>
				<Text style={styles.close} onPress={onClose}>
					Schließen
				</Text>
			</View>
		</View>
	);
}

const styles = StyleSheet.create({
  overlay: {
	position: 'absolute',
	top: 0,
	left: 0,
	right: 0,
	bottom: 0,
	backgroundColor: 'rgba(0,0,0,0.3)',
	justifyContent: 'center',
	alignItems: 'center',
	zIndex: 1000,
  },
  containerSmall: {
	backgroundColor: '#fff',
	borderRadius: 16,
	padding: 24,
	width: '90%',
	alignSelf: 'center',
	marginBottom: 0,
  },
  title: {
	fontSize: 24,
	fontWeight: 'bold',
	marginBottom: 16,
	textAlign: 'center',
  },
  item: {
	flexDirection: 'row',
	marginBottom: 16,
	alignItems: 'flex-start',
  },
  name: {
	fontWeight: 'bold',
	fontSize: 16,
  },
  stars: {
	color: '#f1c40f',
	marginBottom: 4,
  },
  text: {
	fontSize: 14,
	color: '#444',
  },
  close: {
	color: '#f6471c',
	textAlign: 'center',
	marginTop: 16,
	fontWeight: 'bold',
	fontSize: 16,
  },
  avatar: {
	width: 40,
	height: 40,
	borderRadius: 20,
	marginRight: 12,
  },
  scrollArea: {
	minHeight: 100,
	maxHeight: 350,
  },
});