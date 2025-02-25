import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#739ce7',
    borderRadius: 8,
    paddingVertical: 12,
    paddingHorizontal: 8,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,

    elevation: 5,
  },
  containerHeader: {
    flexDirection: 'row',
  },
  titleContainer: {
    flex: 1,
  },
  titleStyle: {
    textAlign: 'center',
    fontWeight: '600',
    fontSize: 20,
  },
  imageStyle: {
    width: '100%',
    height: 200,
  },
  genericCardTextSpacing: {
    marginTop: 8,
  },
  genericCardText: {
    fontSize: 16,
    color: 'white',
    marginTop: 8,
  },
  buyCartButton: {
    marginTop: 4,
    paddingVertical: 10,
    justifyContent: 'center',
    alignItems: 'center',
    alignContent: 'center',
    backgroundColor: '#d02d2d',
    borderRadius: 8,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  favoriteIcon: {
    position: 'absolute',
    right: 0,
    backgroundColor: 'black',
    borderRadius: 28,
    padding: 5,
  },
});
export default styles;
