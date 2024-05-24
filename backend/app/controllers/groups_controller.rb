class GroupsController < ApplicationController
    before_action :set_group, only: [:show, :edit, :update, :destroy]

    def index
      @groups = Group.all
    end

    def show
    end

    def create
      @group = Group.new(group_params)
      if @group.save
        render json: { group: @group}, status: :created
      else
        render json: { errors: @group.errors.full_messages }, status: :unprocessable_entity
      end
    end

    def edit
    end

    def update
      if @group.update(group_params)
        render json: { group: @group}, status: :ok
      else
        render :edit
      end
    end

    def destroy
      if @group.admin_id === @user.id
        @group.destroy
        render json: { errors: @group.errors.full_messages }, status: :unprocessable_entity
      else
        render json: { errors: "Not Authorized" }, status: :unauthorized

    end

    private

    def set_group
      @group = Group.find(params[:id])
    end

    def group_params
      params.require(:group).permit(:admin_id, :name, :fish_species, :area)
    end
  end