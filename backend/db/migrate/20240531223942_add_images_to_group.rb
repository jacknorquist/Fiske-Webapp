class AddImagesToGroup < ActiveRecord::Migration[7.1]
  def change
    remove_column :groups, :images_data, :text, array: true
    add_column :groups, :image_1_data, :text
    add_column :groups, :image_2_data, :text
    add_column :groups, :image_3_data, :text
    add_column :groups, :image_4_data, :text
    add_column :groups, :image_5_data, :text
  end
end
