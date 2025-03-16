/**
 * Object with list of ordered, directional coordinates with corresponding characters.
 * The Index format is --> {order_number}:{current_coordinate_x}-{current_coordinate_y}:{next_coordinate_x}-{next_coordinate_y}
 * The value format is --> {current_coordinate_char}:{next_coordinate_char}
 * Example: {1:0-2:0-3: "@:-", 2:0-3:0-4: "-:-"}
 */
type ResolvedCoordinates = {
  [index: string]: string;
};

export default ResolvedCoordinates;
