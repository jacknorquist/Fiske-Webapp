module ApplicationHelper
    def group_json(group)
        group_json = group.as_json(only: [:id, :admin_id, :name, :fish_species, :area, :description])

        if group.header_image
          group_json[:header_image_url] = group.header_image_url
        end

        images = {}
        (1..5).each do |i|
          image = group.send("image_#{i}")
          images["image_#{i}"] = image.url if image
        end
        group_json['images'] = images

        group_json
      end

  end