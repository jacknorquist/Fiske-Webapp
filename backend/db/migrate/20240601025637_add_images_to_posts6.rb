class AddImagesToPosts6 < ActiveRecord::Migration[7.1]
  def change
    remove_column :groups, :post_image_1_data, :text
    remove_column :groups, :post_image_2_data, :text
    remove_column :groups, :post_image_3_data, :text
    remove_column :groups, :post_image_4_data, :text
    remove_column :groups, :post_image_5_data, :text

    add_column :posts, :post_image_1_data, :text
    add_column :posts, :post_image_2_data, :text
    add_column :posts, :post_image_3_data, :text
    add_column :posts, :post_image_4_data, :text
    add_column :posts, :post_image_5_data, :text
  end
end

