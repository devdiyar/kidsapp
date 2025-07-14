import { View, type ViewProps } from 'react-native';

export type ThemedViewProps = ViewProps;

export function ThemedView({ style, ...props }: ThemedViewProps) {
  return <View style={[{ backgroundColor: '#FFFFFF' }, style]} {...props} />;
}
