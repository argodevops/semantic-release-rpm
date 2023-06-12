// Swap a dash character for an underscore, in the case of 0.0.1-alpha.1 so it becomes 0.0.1_alpha.1
// rpm doesn't play well with a dash character

export default version => version.replace('-', '_');
