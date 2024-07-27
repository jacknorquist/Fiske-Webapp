class GroupsController < ApplicationController
    before_action :set_group, only: [:show, :edit, :update, :destroy, :join, :leave]

    def index
      groups = Group.all.map do |group|
        group_json(group)
      end
      render json:groups, status: :ok
    end

    def show
        render json:  {
         group: group_json(@group),
         fishboard: @group.group_fishboard.as_json(include: { fish: { methods: :image_url } })
        }
    end

    def create
      @group = Group.new(group_params)

      if @group.save
        render json: { group: group_json(@group)}, status: :created
      else
        render json: { errors: @group.errors.full_messages }, status: :unprocessable_entity
      end
    end

    def edit
    end

    def update
      unless authorized
        return render json: { errors: "Not Authorized" }, status: :unauthorized
      end

      if @group.update(group_params)
        render json: { group: group_json(@group)}, status: :ok
      else
        render json: { errors: @group.errors.full_messages }, status: :unprocessable_entity
      end
    end

    def destroy
      unless authorized
        return render json: { errors: "Not Authorized" }, status: :unauthorized
      end

      if @group.destroy
        render json: { message: "Group Deleted" }, status: :ok
      else
        render json: { errors: @group.errors.full_messages }, status: :unprocessable_entity
      end
    end

    def join
        membership = Membership.new(group: @group, user: @current_user)

        if membership.save
          render json: { message: "Joined group successfully" }, status: :created
        else
          render json: { error: 'Failed to join group' }, status: :unprocessable_entity
        end
    end

    def leave
        if @group.members.delete(@current_user)
          render json: { message: "Left group successfully" }, status: :ok
        else
          render json: { error: 'Failed to leave group' }, status: :unprocessable_entity
        end
      end

      def search
        @query = params[:query].downcase # Convert the query to lowercase
        @groups = Group.where("name ILIKE ? OR area ILIKE ? OR fish_species ILIKE ?", "%#{@query}%", "%#{@query}%", "%#{@query}%").limit(10)
        render json: @groups, status: :ok
      end

    private

    def set_group
      @group = Group.find(params[:id])
    rescue ActiveRecord::RecordNotFound
        render json: { error: 'Group not found' }, status: :not_found
    end


    def group_params
      params.permit(:name, :fish_species, :area, :header_image, :description, *image_params)
      .merge(admin_id: @current_user.id)

    end

    def image_params
      (1..5).map { |i| "image_#{i}" }
    end

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

    def authorized
      @group.admin_id == @current_user.id
    end

  end