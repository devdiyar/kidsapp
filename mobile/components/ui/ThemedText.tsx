import { Text, type TextProps } from 'react-native';

export type ThemedTextProps = TextProps & {
  type?: 'title' | 'subtitle';
};

export function ThemedText({ style, type, ...rest }: ThemedTextProps) {
  const baseStyle = { color: '#000000' };
  
  if (type === 'title') return <Text style={[baseStyle, { fontSize: 24, fontWeight: 'bold' }, style]} {...rest} />;
  if (type === 'subtitle') return <Text style={[baseStyle, { fontSize: 18, fontWeight: '600' }, style]} {...rest} />;
  
  return <Text style={[baseStyle, { fontSize: 16 }, style]} {...rest} />;
}
