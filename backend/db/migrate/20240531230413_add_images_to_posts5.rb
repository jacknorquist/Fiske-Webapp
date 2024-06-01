class AddImagesToPosts5 < ActiveRecord::Migration[7.1]
  def change
    remove_column :groups, :images_posts_data, :text, array: true
    add_column :groups, :post_image_1_data, :text
    add_column :groups, :post_image_2_data, :text
    add_column :groups, :post_image_3_data, :text
    add_column :groups, :post_image_4_data, :text
    add_column :groups, :post_image_5_data, :text
  end
end
