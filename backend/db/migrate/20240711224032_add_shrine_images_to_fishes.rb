class AddShrineImagesToFishes < ActiveRecord::Migration[7.1]
  def change
    remove_column :fish, :image, :string
    add_column :fish, :image_data, :text
  end
end
